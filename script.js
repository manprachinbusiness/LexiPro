/**
 * Tab Navigation Handler
 * Manages switching between different content sections
 * @param {string} tabId - The ID of the tab to show
 */
function showTab(tabId) {
    // Remove active classes from all content cards
    document.querySelectorAll('.content-card').forEach(card => {
        card.classList.remove('active');
    });

    // Remove active classes from all tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Add active class to selected content card
    document.getElementById(tabId).classList.add('active');

    // Add active class to clicked tab button
    event.currentTarget.classList.add('active');
}
