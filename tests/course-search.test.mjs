import test from 'node:test';
import assert from 'node:assert/strict';
import {searchCourses} from '../lib/course-search.mjs';
const skills=[{id:'clips',name:'Sequence and trim video clips',areas:['Event media']},{id:'explain',name:'Explain technical concepts',areas:['Teaching']}];
const courses=[{id:'capcut',name:'Clip editing',tool:'CapCut',description:'Create a short story',category:'Video editing',areas:['Content creation'],outcomes:['clips']},{id:'code',name:'Coding demonstration',tool:'JavaScript',description:'Guide a teammate',category:'Web design',areas:['Technical communication'],outcomes:['explain']}];
test('blank search returns all courses without mutating catalogue',()=>{
 assert.deepEqual(searchCourses(courses,skills,'  '),courses);assert.equal(courses.length,2);
});
test('search trims, ignores case and matches terms across tool and course fields',()=>{
 assert.deepEqual(searchCourses(courses,skills,'  CAPCUT  story ').map(course=>course.id),['capcut']);
 assert.deepEqual(searchCourses(courses,skills,'coding').map(course=>course.id),['code']);
});
test('mapped atomic skill names and areas are searchable',()=>{
 assert.deepEqual(searchCourses(courses,skills,'trim').map(course=>course.id),['capcut']);
 assert.deepEqual(searchCourses(courses,skills,'event media').map(course=>course.id),['capcut']);
 assert.deepEqual(searchCourses(courses,skills,'teaching').map(course=>course.id),['code']);
});
test('category and search combine, including secondary course areas',()=>{
 assert.deepEqual(searchCourses(courses,skills,'capcut','Web design'),[]);
 assert.deepEqual(searchCourses(courses,skills,'concepts','Technical communication').map(course=>course.id),['code']);
 assert.deepEqual(searchCourses(courses,skills,'no matching course'),[]);
});
