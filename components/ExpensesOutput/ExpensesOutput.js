import { View, StyleSheet } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../../constants/styles";

const DUMMY_EXPENSES = [
    {
        id: 'e1',
        description: 'A pair od shoes',
        amount: 159.99,
        date: new Date('2024-12-19')
    },
    {
        id: 'e2',
        description: 'Milk',
        amount: 2.99,
        date: new Date('2024-12-21')
    },
    {
        id: 'e3',
        description: 'Coffee',
        amount: 2,
        date: new Date('2024-12-25')
    },
    {
        id: 'e4',
        description: 'Bus ticket',
        amount: 19.75,
        date: new Date('2024-12-28')
    },
    {
        id: 'e5',
        description: 'Food',
        amount: 39.95,
        date: new Date('2024-12-31')
    }
]

function ExpensesOutput({expenses, expensesPeriod}){
    return(
        <View style={styles.container}>
            <ExpensesSummary 
                periodName={expensesPeriod} 
                expenses={DUMMY_EXPENSES}
            />
            <ExpensesList expenses={DUMMY_EXPENSES}/>
        </View>
    );
}

export default ExpensesOutput;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 0,
        backgroundColor: GlobalStyles.colors.primary700,
    }
});