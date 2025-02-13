import { StyleSheet, View } from "react-native";
import { GlobalStyles } from "../constants/styles";
import { useLayoutEffect } from "react";
import IconButton from '../components/UI/IconButton';
import Button from "../components/UI/Button";

function ManageExpenses({route, navigation}){
    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        });
    }, [navigation, isEditing]);

    function deleteExpense(){
        navigation.goBack();
    }

    function cancelHandler(){
        navigation.goBack();
    }

    function confirmHandler(){
        navigation.goBack();
    }

    return(
        <View style= {styles.screen}>
            <View style={styles.buttons}>
                <Button mode={'flat'} onPress={cancelHandler} style={styles.button}>Cancel</Button>
                <Button onPress={confirmHandler} style={styles.button}>{isEditing ? 'Update' : 'Add'}</Button>
            </View>
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
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8,
    },
});