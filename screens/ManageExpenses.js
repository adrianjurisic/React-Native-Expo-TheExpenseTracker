import { StyleSheet, View } from "react-native";
import { GlobalStyles } from "../constants/styles";
import { useContext, useLayoutEffect, useState } from "react";
import IconButton from '../components/UI/IconButton';
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { storeExpense, updateExpense, deleteExpenseDB } from '../util/http';
import Loading from "../components/UI/Loading";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function ManageExpenses({route, navigation}){
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState();
    const expenseCtx = useContext(ExpensesContext);
    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;
    const selectedExpense = expenseCtx.expenses.find(expense => expense.id === editedExpenseId);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        });
    }, [navigation, isEditing]);

    async function deleteExpenseHandler(){
        setIsSubmitting(true);
        try{
            await deleteExpenseDB(editedExpenseId);
            expenseCtx.deleteExpense(editedExpenseId);
            navigation.goBack();
        }catch(error){
            setError('Could not delete item!');
            setIsSubmitting(false);
        }
    }

    function cancelHandler(){
        navigation.goBack();
    }

    async function confirmHandler(expenseData){
        setIsSubmitting(true);
        try{
            if(isEditing){
                expenseCtx.updateExpense(editedExpenseId, expenseData);
                await updateExpense(editedExpenseId, expenseData);
            } else {
                const id = await storeExpense(expenseData);
                expenseCtx.addExpense({...expenseData, id: id});
            }
            navigation.goBack();
        }catch(error){
            setError('Could not save data!');
            setIsSubmitting(false);
        }
    }

    function errorHandler(){
        setError(null);
    }

    if(error && !isSubmitting){
        return <ErrorOverlay message={error} onConfirm={errorHandler}/>
    }

    if(isSubmitting){
        return <Loading/>
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
                        onPress={deleteExpenseHandler}
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