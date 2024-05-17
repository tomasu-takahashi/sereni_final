import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import dashboard from '../screens/dashboard';
import Chat from '../screens/Chat';

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return(
        <Tab.Navigator>
            <Tab.Screen name="Home" component={dashboard} />
            <Tab.Screen name="Chat" component={Chat} />
        </Tab.Navigator>
    )
}

export default Tabs;