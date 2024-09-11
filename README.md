# This document explains the implementation details of the Undo/Redo functionality in an Angular form using reactive forms.

# The form consists of 5 inputs: userName, email, phoneNumber, acceptTerms, and country.

# The form has two buttons, Undo and Redo, to allow users to revert changes or redo previously undone changes.

# This functionality ensures that user interactions with the form are fully reversible, tracking all modifications to the form fields.

=====================================================================================================

# 1. Form Structure:

# The form contains the following fields:

# userName: A text input for entering the user's name.

# email: A text input for entering the user's email.

# phoneNumber: A text input for entering the user's phone number.

# acceptTerms: A checkbox to confirm whether the user accepts terms.

# country: A dropdown to select a country.

# The form is built using Angular’s Reactive Forms for better state management and control over form behavior.

=====================================================================================================

# 2. Undo/Redo Mechanism:

# State Tracking

# undoStack: A stack (array) that stores the history of the form states.

# redoStack: A stack that stores the undone states when the undo operation is performed.

# The undoStack holds the current and previous form values, while the redoStack keeps track of changes that are undone, allowing them to be redone.

# Behavior of Undo/Redo:

# When a user makes a change to a form input and moves to the next input (i.e., blur event), the current form state is captured and pushed onto the undoStack.

# When the Undo button is clicked, the last change made is removed from the undoStack, and the form is reverted to its previous state. The undone state is pushed onto the redoStack.

# If the Redo button is clicked, the last undone state is retrieved from the redoStack and applied back to the form, and that state is pushed back onto the undoStack.

=====================================================================================================

# 3. Testing the Undo/Redo Functionality:

# To ensure that the Undo/Redo functionality works correctly, follow these steps:

# Initial State:

# When the form is first loaded, both the Undo and Redo buttons should be disabled.

# Entering Data:

# Start by entering data into any of the fields.

# After completing an input (or moving to another input), the Undo button should become enabled.

# Ensure the Redo button remains disabled at this stage.

# Performing Undo:

# Modify one or more fields and then click Undo.

# The last modification should be reverted, and the Redo button should be enabled.

# The Undo button remains enabled as long as there are more states in the undoStack.

# Performing Redo:

# After undoing changes, click Redo to reapply the last undone change.

# The Redo button should become disabled if there are no more undone states in the redoStack.

# Further Modifications:

# If you make a new change after performing an undo action, the Redo stack should be cleared, and the Redo button should be disabled.

=====================================================================================================

# 4. Edge Case Handling

# Focus without Input: If you click on an input without entering a value and then switch to another field, no changes are captured, and the Undo button remains disabled.

# No Redo without Undo: The Redo button will only be available after an Undo action is performed.
