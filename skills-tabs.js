// Skills Tabs Functionality
document.addEventListener('DOMContentLoaded', function() {
    const skillTabs = document.querySelectorAll('.skill-tab');
    const skillTabContents = document.querySelectorAll('.skill-tab-content');

    skillTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');

            // Remove active class from all tabs and contents
            skillTabs.forEach(t => t.classList.remove('active'));
            skillTabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked tab
            this.classList.add('active');

            // Show corresponding content
            const targetContent = document.getElementById(`${tabName}-tab`);
            if (targetContent) {
                targetContent.classList.add('active');
            }

            // Refresh AOS animations
            if (typeof AOS !== 'undefined') {
                AOS.refresh();
            }
        });
    });
});
