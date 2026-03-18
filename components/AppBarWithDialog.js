import { Appbar, Button, Dialog, Portal, Text } from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import useAppwrite from '../context/appwriteAuthContext';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View } from 'react-native';

function AppBarWithDialog() {
    const { auth, setIsLoggedIn, user: { email, name, university, isOrganizer } } = useAppwrite();

    const [visible, setVisible] = useState(false);
    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);

    const handleLogout = () => {
        auth.logout().then(() => {
            AsyncStorage.removeItem('appwriteSession').then(() => {
                console.log('Logged Out');
                setIsLoggedIn(false);
            })
        });
    }

    return (
        <>
            <Appbar.Header statusBarHeight={0} className='bg-white'>
                <Appbar.Content title="UniSphere" titleStyle={{ fontWeight: '600' }} />
                <Text className='font-semibold'>{name}</Text>
                <Appbar.Action icon={() => <MaterialCommunityIcons name="account" size={24} color="#6200ee" />} onPress={showDialog} />
            </Appbar.Header>

            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog} className='py-5'>
                    <View style={{ alignSelf: 'center', marginBottom: 8 }}>
                        <MaterialCommunityIcons name="account" size={50} color="#6200ee" />
                    </View>
                    <Dialog.Title className='text-center'>Account Information</Dialog.Title>
                    <Dialog.Content>
                        <Text variant="bodyMedium">Name : {name}</Text>
                        <Text variant="bodyMedium">Email : {email}</Text>
                        <Text variant="bodyMedium">University : {university}</Text>
                        {/* <Text variant="bodyMedium">Organizer : {isOrganizer ? 'YES' : 'NO'}</Text> */}
                        <Text variant="bodyMedium"></Text>
                        <Button icon={() => <MaterialCommunityIcons name="logout" size={20} color="#fff" />} className='rounded-md bg-red-500' mode="contained" onPress={handleLogout}>
                            Logout
                        </Button>
                    </Dialog.Content>
                </Dialog>
            </Portal>
        </>
    )
}

export default AppBarWithDialog