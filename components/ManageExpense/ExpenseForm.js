import { View, StyleSheet, Text } from "react-native";
import Input from "./Input";
import { useState } from "react";

function ExpenseForm(){
    const [inputValues, setInputValues] = useState({
        amount: '',
        date: '',
        description: '',
    });

    function inputChangeHandler(inputIdentifier, enteredValue){
        setInputValues((current) => {
            return{
                ...current,
                [inputIdentifier]: enteredValue
            };
        });
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
    }
});