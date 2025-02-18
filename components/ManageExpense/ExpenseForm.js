import { View, StyleSheet, Text, Alert } from "react-native";
import Input from "./Input";
import { useState } from "react";
import Button from "../UI/Button";
import { getFormattedDate } from "../../util/date";

function ExpenseForm({onCancel, onSubmit, submitLabel, defaultValues}){
    const [inputValues, setInputValues] = useState({
        amount: defaultValues ? defaultValues.amount.toFixed(2).toString() : '',
        date: defaultValues ? getFormattedDate(defaultValues.date) : '',
        description: defaultValues ? defaultValues.description : '',
    });

    function inputChangeHandler(inputIdentifier, enteredValue){
        setInputValues((current) => {
            return{
                ...current,
                [inputIdentifier]: enteredValue
            };
        });
    }

    function submitHandler(){
        const expenseData = {
            amount: +inputValues.amount,
            date: new Date(inputValues.date),
            description: inputValues.description
        };

        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
        const descriptionIsValid = expenseData.description.trim().length > 0;
        if(!amountIsValid && !dateIsValid && !descriptionIsValid){
            Alert.alert('Invalid input', 'Please fill out hte form!');
            return;
        }else if(!amountIsValid){
            Alert.alert('Invalid input', 'Please enter a positive number for a amount!');
            return;
        }else if(!dateIsValid){
            Alert.alert('Invalid input', 'Please enter a date in form "YYYY-MM-DD"!');
            return;
        }else if(!descriptionIsValid){
            Alert.alert('Invalid input', 'Enter a description!');
            return;
        }
        onSubmit(expenseData);
    }

    return(
        <View style={styles.form}>
            <Text style={styles.title}>Your Expense</Text>
            <View style={styles.inputsRow}>
                <Input label={"Amount"} style={styles.rowInput} textInputConfig={{
                    keyboardType: 'decimal-pad',
                    onChangeText: inputChangeHandler.bind(this, 'amount'),
                    value: inputValues.amount,
                }}/>
                <Input label={"Date"} style={styles.rowInput} textInputConfig={{
                    placeholder: 'YYYY-MM-DD',
                    maxLength: 10,
                    onChangeText: inputChangeHandler.bind(this, 'date'),
                    value: inputValues.date,
                }}/>           
            </View>
            <Input label={"Description"} textInputConfig={{
                multiline: true,
                autoCorrect: false,
                onChangeText: inputChangeHandler.bind(this, 'description'),
                value: inputValues.description,
            }}/>
            <View style={styles.buttons}>
                <Button mode={'flat'} onPress={onCancel} style={styles.button}>Cancel</Button>
                <Button onPress={submitHandler} style={styles.button}>{submitLabel}</Button>
            </View>
        </View>
    );
}

export default ExpenseForm;

const styles = StyleSheet.create({
    inputsRow:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    rowInput: {
        flex: 1,
    },
    form: {
        marginTop: 80,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginVertical: 24,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8,
    },
});