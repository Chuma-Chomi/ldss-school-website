// Simple script to register test users via the API

const users = [
    {
        email: 'admin@ldss.edu.zm',
        password: 'password123',
        name: 'John Mwale',
        role: 'ADMIN'
    },
    {
        email: 'teacher@ldss.edu.zm',
        password: 'password123',
        name: 'Mary Banda',
        role: 'STAFF'
    },
    {
        email: 'student@ldss.edu.zm',
        password: 'password123',
        name: 'David Phiri',
        role: 'LEARNER'
    }
];

async function registerUsers() {
    console.log('🌱 Creating test users...\n');

    for (const user of users) {
        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });

            const data = await response.json();

            if (response.ok) {
                console.log(`✅ ${user.role} created: ${user.email}`);
            } else {
                console.log(`⚠️  ${user.role}: ${data.error || data.message}`);
            }
        } catch (error) {
            console.error(`❌ Error creating ${user.role}:`, error.message);
        }
    }

    console.log('\n🎉 Setup completed!');
    console.log('\n📝 Test Credentials:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Admin:');
    console.log('  Email: admin@ldss.edu.zm');
    console.log('  Password: password123');
    console.log('\nStaff:');
    console.log('  Email: teacher@ldss.edu.zm');
    console.log('  Password: password123');
    console.log('\nLearner:');
    console.log('  Email: student@ldss.edu.zm');
    console.log('  Password: password123');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

registerUsers();
