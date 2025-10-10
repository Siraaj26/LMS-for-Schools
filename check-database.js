const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://iggyleprkjwrveimubex.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlnZ3lsZXBya2p3cnZlaW11YmV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgzNTQyODMsImV4cCI6MjA3MzkzMDI4M30.1gHpu5GjgDsT8JLTWIwswJ2ba476xKoKdsR1LRhXDto';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function checkDatabase() {
    console.log('\n🔍 CHECKING DATABASE STATUS\n');
    console.log('='.repeat(60));

    // Check student_login table
    console.log('\n📊 Checking student_login table...');
    const { data: students, error: studentsError } = await supabase
        .from('student_login')
        .select('id, full_name, email, current_grade, location');

    if (studentsError) {
        console.log('❌ Error:', studentsError.message);
    } else if (students && students.length > 0) {
        console.log(`✅ Found ${students.length} student(s):`);
        students.forEach(s => {
            console.log(`   - ${s.full_name} (${s.email}) - ${s.current_grade}, ${s.location}`);
        });
    } else {
        console.log('⚠️  No students found in database!');
    }

    // Check grades table
    console.log('\n📚 Checking grades table...');
    const { data: grades, error: gradesError } = await supabase
        .from('grades')
        .select('id, student_id, subject');

    if (gradesError) {
        console.log('❌ Error:', gradesError.message);
    } else if (grades && grades.length > 0) {
        console.log(`✅ Found ${grades.length} grade record(s)`);
        const gradesPerStudent = {};
        grades.forEach(g => {
            gradesPerStudent[g.student_id] = (gradesPerStudent[g.student_id] || 0) + 1;
        });
        Object.entries(gradesPerStudent).forEach(([studentId, count]) => {
            console.log(`   - Student ID ${studentId}: ${count} subjects`);
        });
    } else {
        console.log('⚠️  No grades found in database!');
    }

    // Check assignments table
    console.log('\n📝 Checking assignments table...');
    const { data: assignments, error: assignmentsError } = await supabase
        .from('assignments')
        .select('id, student_id, title');

    if (assignmentsError) {
        console.log('❌ Error:', assignmentsError.message);
    } else if (assignments && assignments.length > 0) {
        console.log(`✅ Found ${assignments.length} assignment(s)`);
        const assignmentsPerStudent = {};
        assignments.forEach(a => {
            assignmentsPerStudent[a.student_id] = (assignmentsPerStudent[a.student_id] || 0) + 1;
        });
        Object.entries(assignmentsPerStudent).forEach(([studentId, count]) => {
            console.log(`   - Student ID ${studentId}: ${count} assignments`);
        });
    } else {
        console.log('⚠️  No assignments found in database!');
    }

    // Check test account specifically
    console.log('\n🎯 Checking test account (student@test.com)...');
    const { data: testStudent, error: testError } = await supabase
        .from('student_login')
        .select('*')
        .eq('email', 'student@test.com')
        .single();

    if (testError) {
        console.log('❌ Error:', testError.message);
        console.log('\n⚠️  TEST ACCOUNT NOT FOUND!');
        console.log('   You need to run the SETUP_DATABASE.sql script in Supabase.');
    } else if (testStudent) {
        console.log('✅ Test account found!');
        console.log(`   ID: ${testStudent.id}`);
        console.log(`   Name: ${testStudent.full_name}`);
        console.log(`   Email: ${testStudent.email}`);
        console.log(`   Grade: ${testStudent.current_grade}`);
        console.log(`   Location: ${testStudent.location}`);
        console.log(`   Target University: ${testStudent.target_university}`);
    }

    console.log('\n' + '='.repeat(60));
    console.log('\n💡 NEXT STEPS:');
    if (!students || students.length === 0) {
        console.log('   1. Open Supabase SQL Editor');
        console.log('   2. Run the SETUP_DATABASE.sql script');
        console.log('   3. Run this check again');
    } else {
        console.log('   ✅ Database looks good!');
        console.log('   📱 Try logging in with: student@test.com / password123');
    }
    console.log('\n');
}

checkDatabase().catch(console.error);



