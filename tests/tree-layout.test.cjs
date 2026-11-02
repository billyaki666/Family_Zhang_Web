const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const {execFileSync} = require('node:child_process');
const {performance} = require('node:perf_hooks');

const current = fs.readFileSync('app.js', 'utf8');
const baseline = process.argv.includes('--compare-head')
  ? execFileSync('git', ['show', 'HEAD:app.js'], {encoding:'utf8', maxBuffer:10 * 1024 * 1024})
  : null;

function makeLayout(source, data, collapsed = []) {
  const start = source.indexOf('function layout() {');
  const end = source.indexOf('function render() {', start);
  assert(start >= 0 && end > start);
  const context = {data, collapsedBranches:new Set(collapsed), viewport:{clientWidth:1280}, scale:.72,
    CARD_W:64, SPOUSE_W:48, CARD_H:84, SPOUSE_GAP:10, FAMILY_GAP:18, ROW_GAP:138, MARGIN:110};
  context.person = id => data.people.find(p => p.id === id);
  vm.createContext(context);
  vm.runInContext(source.slice(start, end), context);
  return context.layout;
}

function family(count) {
  const people=[], unions=[], parentLinks=[];
  for(let i=0;i<count;i++) {
    const generation=Math.floor(Math.log2(i+1))+1;
    people.push({id:`p${i+1}`, generation, gender:i%2?'female':'male'});
    if(i)parentLinks.push({parent:`p${Math.floor((i-1)/2)+1}`,child:`p${i+1}`});
    if(i%10===0) {
      people.push({id:`s${i+1}`,generation,gender:'female'});
      unions.push({partners:[`p${i+1}`,`s${i+1}`]});
    }
  }
  return {people,unions,parentLinks};
}

for(const count of [1, 50, 500, 2000]) {
  const data=family(count);
  for(const collapsed of [[], ['p2']]) {
    const layout=makeLayout(current,data,collapsed);
    const start=performance.now(), result=layout(), elapsed=performance.now()-start;
    assert(Number.isFinite(result.width) && Number.isFinite(result.height));
    assert(result.pos.p1);
    if(collapsed.length && count>3)assert(!result.pos.p4);
    if(baseline) {
      const oldLayout=makeLayout(baseline,data,collapsed);
      const oldStart=performance.now(), old=oldLayout(), oldElapsed=performance.now()-oldStart;
      assert.equal(JSON.stringify(result.pos),JSON.stringify(old.pos),`layout changed for ${count} people`);
      assert.equal(result.width,old.width);
      assert.equal(result.height,old.height);
      console.log(`${count} people, collapsed=${!!collapsed.length}: ${oldElapsed.toFixed(1)}ms -> ${elapsed.toFixed(1)}ms`);
    }
  }
}
const empty=makeLayout(current,{people:[],unions:[],parentLinks:[]})();
assert(Number.isFinite(empty.width) && Number.isFinite(empty.height));
assert.match(current.split('\n')[0], /"昌", "克"/);
const transformSource=current.match(/function applyTransform\(\)\{[^\n]+/)[0];
let layouts=0, railGenerations;
const transformContext={canvas:{style:{}},panX:12,panY:34,scale:.72,renderedLayout:{generations:[1,17]},
  $:()=>({textContent:''}),layout:()=>{layouts++;},renderRail:gens=>{railGenerations=gens;}};
vm.createContext(transformContext);
vm.runInContext(`${transformSource}\napplyTransform();applyTransform();`,transformContext);
assert.equal(layouts,0,'panning and zooming must not recalculate layout');
assert.deepEqual(railGenerations,[1,17]);
console.log('Tree layout checks passed.');
