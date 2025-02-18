import { View, StyleSheet, Text, Alert } from "react-native";
import Input from "./Input";
import { useState } from "react";
import Button from "../UI/Button";
import { getFormattedDate } from "../../util/date";
import { GlobalStyles } from "../../constants/styles";

function ExpenseForm({onCancel, onSubmit, submitLabel, defaultValues}){
    const [inputs, setInputs] = useState({
        amount: {value: defaultValues ? defaultValues.amount.toFixed(2).toString() : '', 
                 isValid: true
        },
        date: {value: defaultValues ? getFormattedDate(defaultValues.date) : '',
               isValid: true 
        },
        description: {value: defaultValues ? defaultValues.description : '',
                      isValid: true
        },
    });

    function inputChangeHandler(inputIdentifier, enteredValue){
        setInputs((current) => {
            return{
                ...current,
                [inputIdentifier]: {value: enteredValue, isValid: true},
            };
        });
    }

    function submitHandler(){
        const expenseData = {
            amount: +inputs.amount.value,
            date: new Date(inputs.date.value),
            description: inputs.description.value
        };

        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
        const descriptionIsValid = expenseData.description.trim().length > 0;

        if(!amountIsValid || !dateIsValid || !descriptionIsValid){
            setInputs((current) => {
                return {
                    amount: {value: current.amount.value, isValid: amountIsValid},
                    date: {value: current.date.value, isValid: dateIsValid},
                    description: {value: current.description.value, isValid: descriptionIsValid},
                }
            });
            return;
        }
        onSubmit(expenseData);
    }

    const formIsInvalid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid;

    return(
        <View style={styles.form}>
            <Text style={styles.title}>Your Expense</Text>
            <View style={styles.inputsRow}>
                <Input label={"Amount"} style={styles.rowInput} invalid={inputs.amount.isValid} textInputConfig={{
                    keyboardType: 'decimal-pad',
                    onChangeText: inputChangeHandler.bind(this, 'amount'),
                    value: inputs.amount.value,
                }}/>
                <Input label={"Date"} style={styles.rowInput} invalid={inputs.date.isValid} textInputConfig={{
                    placeholder: 'YYYY-MM-DD',
                    maxLength: 10,
                    onChangeText: inputChangeHandler.bind(this, 'date'),
                    value: inputs.date.value,
                }}/>           
            </View>
            <Input label={"Description"} invalid={inputs.description.isValid} textInputConfig={{
                multiline: true,
                autoCorrect: false,
                onChangeText: inputChangeHandler.bind(this, 'description'),
                value: inputs.description.value,
            }}/>
            {formIsInvalid && (<Text style={styles.error}>Invalid Input!</Text>)}
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
    error: {
        color: GlobalStyles.colors.error500,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});