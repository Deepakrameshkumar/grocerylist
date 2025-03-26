document.addEventListener('DOMContentLoaded', async () => {
    const openItemsList = document.querySelector('.open-items');
    const closedItemsList = document.querySelector('.closed-items');

    // Initialize Firestore
    const db = firebase.firestore();

    // Function to render an item in the list
    function renderItem(list, itemData) {
        const listItem = document.createElement('li');
        listItem.textContent = `${itemData.name} (${itemData.status === 'open' ? `Added: ${itemData.opentime}` : `Completed: ${itemData.closetime}`})`;
        list.appendChild(listItem);
    }

    try {
        // Fetch and render open items
        const openItemsSnapshot = await db.collection('grocerylist').where('status', '==', 'open').get();
        openItemsSnapshot.forEach(doc => {
            const itemData = { id: doc.id, ...doc.data() };
            renderItem(openItemsList, itemData);
        });

        // Fetch and render closed items
        const closedItemsSnapshot = await db.collection('grocerylist').where('status', '==', 'complete').get();
        closedItemsSnapshot.forEach(doc => {
            const itemData = { id: doc.id, ...doc.data() };
            renderItem(closedItemsList, itemData);
        });
    } catch (error) {
        console.error('Error fetching items:', error);
    }
});