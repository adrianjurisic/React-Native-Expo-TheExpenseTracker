import { Text, StyleSheet, View } from "react-native";
import { GlobalStyles } from "../constants/styles";

function ManageExpenses(){
    return(
        <View style= {styles.screen}>
            <Text style={styles.text}>Manage Expenses... soon</Text>
        </View>
    )
}

export default ManageExpenses;

const styles = StyleSheet.create({
    screen: {
        backgroundColor: GlobalStyles.colors.primary700,
        flex: 1,
    },
    text: {
        color: 'white',
        padding: 10,
    }
});