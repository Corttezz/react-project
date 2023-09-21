import {createStackNavigator} from "@react-navigation/stack"

import Dieta from "../pages/Dashboard-Screens/Dieta";
import Cronometro from "../pages/Dashboard-Screens/Cronometro";
import Metas from "../pages/Dashboard-Screens/Metas";

const Stack = createStackNavigator();

export default function Routes(){
    return(
        <Stack.Navigator>
            <Stack.Screen
            name="Dieta"  
            component={Dieta}
            options={{headerShown: false}}
            />
            <Stack.Screen
            name="Cronometro"
            component={Cronometro}
            options={{headerShown: false}}
            />
            <Stack.Screen
            name="Metas"
            component={Metas}
            options={{headerShown: false}}
            />
     </Stack.Navigator>
        
    )
}