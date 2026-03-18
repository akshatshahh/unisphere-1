import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Bottom Tabs
import HomeTab from "./tabs/HomeTab"
import MyEventsTab from "./tabs/MyEventsTab"
import OthersTab from "./tabs/OthersTab"

const Tab = createMaterialBottomTabNavigator();

const iconSize = 24;

export default function MainScreen() {
    return (
        <Tab.Navigator
            barStyle={{ backgroundColor: 'white' }}
        >
            <Tab.Screen
                name="home_tab"
                component={HomeTab}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ focused, color }) => (
                        <MaterialCommunityIcons name={focused ? 'home' : 'home-outline'} size={iconSize} color={color} />
                    ),
                }}
            />

            <Tab.Screen
                name="my_events_tab"
                component={MyEventsTab}
                options={{
                    tabBarLabel: 'My Events',
                    tabBarIcon: ({ focused, color }) => (
                        <MaterialCommunityIcons name={focused ? 'ticket-confirmation' : 'ticket-confirmation-outline'} size={iconSize} color={color} />
                    ),
                }}
            />

            <Tab.Screen
                name="others_tab"
                component={OthersTab}
                options={{
                    tabBarLabel: 'Others',
                    tabBarIcon: ({ focused, color }) => (
                        <MaterialCommunityIcons name={focused ? 'compass' : 'compass-outline'} size={iconSize} color={color} />
                    ),
                }}
            />

        </Tab.Navigator>
    );
}