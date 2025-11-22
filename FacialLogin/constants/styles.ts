import { StyleSheet } from 'react-native';
import { COLORS } from './colors';

export const STYLES = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
        fontSize: 16,
    },
    buttonsContainer: {
        position: 'absolute',
        bottom: 50,
        width: '100%',
        alignItems: 'center',
    },
    button: {
        backgroundColor: COLORS.accent,
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 10,
        marginVertical: 10,
        width: '80%',
        alignItems: 'center',
    },
    buttonText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 18,
        textAlign: 'center',
        color: COLORS.gray,
    },
});