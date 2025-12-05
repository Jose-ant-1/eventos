document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("addBtn").addEventListener("click", function () {
        const text = document.getElementById("inputText").value.trim();
        if (text === "") return;

        // Check if the ordered list exists
        let list = document.getElementById("myList");
        if (!list) {
            // Create the <ol> dynamically
            list = document.createElement("ol");
            list.id = "myList";
            document.body.append(list);
        }

        // Create a new <li> and add text
        const newItem = document.createElement("li");
        const txtNode = document.createTextNode(text);
        newItem.append(txtNode);

        // Insert the new item at the top of the list
        if (list.firstChild) {
            list.insertBefore(newItem, list.firstChild);
        } else {
            list.append(newItem);
        }

        // Clear the text field
        document.getElementById("itemText").value = "";
    });

})
