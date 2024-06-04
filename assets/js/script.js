// Importing necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCvBRlhxfrp6NcCqrFlDHUEfo0tBiTZ2zY",
    authDomain: "morteza-ass-site.firebaseapp.com",
    databaseURL: "https://morteza-ass-site-default-rtdb.firebaseio.com",
    projectId: "morteza-ass-site",
    storageBucket: "morteza-ass-site.appspot.com",
    messagingSenderId: "861361010323",
    appId: "1:861361010323:web:b3aa8c9c01cb35c37a3f66",
    measurementId: "G-CJ90FEV3W8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Function to update UI based on authentication state
function updateUIBasedOnAuthState(user) {
    if (user) {
        // User is signed in
        console.log("User is signed in.");

        // Retrieve user's name from session storage
        const firstName = sessionStorage.getItem('userFirstName');
        const lastName = sessionStorage.getItem('userLastName');
        console.log(firstName, lastName);

        // Display user's full name
        document.getElementById('userFullName').textContent = `${firstName} ${lastName}`;

        // Hide login and register links, show welcome message and logout link
        document.getElementById('login_link').style.display = 'none';
        document.getElementById('register_link').style.display = 'none';
        document.getElementById('welcomeMessage').style.display = 'block';
        // document.getElementById('userProfileLink').style.display = 'block';
        document.getElementById('userFullName').style.display = 'block';
    } else {
        // No user is signed in
        console.log("No user is signed in.");

        // Show login and register links, hide welcome message and logout link
        document.getElementById('login_link').style.display = 'block';
        document.getElementById('register_link').style.display = 'block';
        document.getElementById('welcomeMessage').style.display = 'none';
        // document.getElementById('userProfileLink').style.display = 'none';
        document.getElementById('userFullName').style.display = 'none';
    }
}

// Setting up listener for authentication state changes
onAuthStateChanged(auth, (user) => {
    updateUIBasedOnAuthState(user);
});


// Show dropdown menu after click on user's name
document.addEventListener('DOMContentLoaded', function() {
    // const userProfileLink = document.getElementById('userProfileLink');
    const userProfileLink = document.getElementById('userFullName');
    const dropdownMenu = document.getElementById('dropdownMenu');

    userProfileLink.addEventListener('click', function(event) {
        event.stopPropagation(); // Prevent click event from bubbling up
        // event.preventDefault(); // جلوگیری از رفت و برگشت به صفحه قبلی
        dropdownMenu.style.display = dropdownMenu.style.display === 'block'? 'none' : 'block';
    });

    // Close the dropdown menu if the user clicks outside of it
    window.onclick = function(event) {
        if (!event.target.matches('#userProfileLink')) {
            dropdownMenu.style.display = 'none';
        }
    };
});

function adjustDropdownPosition() {
    // const userProfileLink = document.getElementById('userProfileLink');
    const userProfileLink = document.getElementById('userFullName');
    const dropdownMenu = document.getElementById('dropdownMenu');

    // Calculate the position of the dropdown menu
    const rect = userProfileLink.getBoundingClientRect();

    // Adjust the position of the dropdown menu
    dropdownMenu.style.right = `${window.innerWidth - rect.right}px`;
    dropdownMenu.style.top = `${rect.bottom + 20}px`;
}

// Call this function whenever the dropdown is shown
adjustDropdownPosition();

// Also call it when the window is resized
window.addEventListener('resize', adjustDropdownPosition);


// Check user's logging and change the objects display by SessionStorage
// window.addEventListener('load', () => {
//     if (sessionStorage.getItem('isLoggedIn') === 'true' ) {
//         // Restore the user's first and last name from session storage
//         const firstName = sessionStorage.getItem('userFirstName');
//         const lastName = sessionStorage.getItem('userLastName');
//         console.log(firstName, lastName)
//         console.log(sessionStorage)
//
//         // Combine first and last name
//         let fullName;
//         fullName = `${firstName} ${lastName}`;
//
//         document.getElementById('userFullName').textContent = fullName;
//         document.getElementById('login_link').style.display = 'none';
//         document.getElementById('register_link').style.display = 'none';
//         document.getElementById('welcomeMessage').style.display = 'block';
//         document.getElementById('logout_link').style.display = 'block';
//     }
// });

// تابع برای حذف کلاس‌ها و ویژگی‌های غیرضروری برای دستگاه‌های موبایل
function removeMobileFeatures() {
    [].slice.call(document.querySelectorAll("[data-bss-disabled-mobile]"))
       .forEach(function(element) {
            element.classList.remove("animated");
            element.removeAttribute("data-bss-hover-animate");
            element.removeAttribute("data-aos");
            element.removeAttribute("data-bss-parallax-bg");
            element.removeAttribute("data-bss-scroll-zoom");
        });
}

// بررسی وجود AOS و 初始化 آن
document.addEventListener("DOMContentLoaded", function() {
    if ("AOS" in window) {
        AOS.init();
    }
}, false);

// بررسی عرض پنجره و اجرای removeMobileFeatures در صورت نیاز
if (window.innerWidth < 768) {
    removeMobileFeatures();
}
