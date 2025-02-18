import { StyleSheet, View } from "react-native";
import { GlobalStyles } from "../constants/styles";
import { useContext, useLayoutEffect } from "react";
import IconButton from '../components/UI/IconButton';
import Button from "../components/UI/Button";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";

function ManageExpenses({route, navigation}){
    const expenseCtx = useContext(ExpensesContext);
    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;

    const selectedExpense = expenseCtx.expenses.find(expense => expense.id === editedExpenseId);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        });
    }, [navigation, isEditing]);

    function deleteExpense(){
        expenseCtx.deleteExpense(editedExpenseId);
        navigation.goBack();
    }

    function cancelHandler(){
        navigation.goBack();
    }

    function confirmHandler(expenseData){
        if(isEditing){
            expenseCtx.updateExpense(editedExpenseId, expenseData);
        } else {
            expenseCtx.addExpense(expenseData);
        }
        navigation.goBack();
    }

    return(
        <View style= {styles.screen}>
            <ExpenseForm 
                onCancel={cancelHandler} 
                submitLabel={isEditing ? 'Update' : 'Add'} 
                onSubmit={confirmHandler}
                defaultValues={selectedExpense}
            />
            {isEditing && (
                <View style={styles.deleteContainer}>
                    <IconButton 
                        icon={'trash'} 
                        color={GlobalStyles.colors.error500} 
                        size={36} 
                        onPress={deleteExpense}
                    />
                </View>
                
            )}
        </View>
    )
}

export default ManageExpenses;

const styles = StyleSheet.create({
    screen: {
        backgroundColor: GlobalStyles.colors.primary800,
        flex: 1,
        padding: 24,
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center',
    },
});