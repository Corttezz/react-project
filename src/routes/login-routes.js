import {createStackNavigator} from "@react-navigation/stack"

import Welcome from "../pages/Welcome";
import SignIn from "../pages/SignIn";
import NavRoutes from "./nav-routes";
import Age from "../pages/Start-Screens/Age";
import FillProfile from "../pages/Start-Screens/FillProfile";
import Gender from  "../pages/Start-Screens/Gender";
import Goal from "../pages/Start-Screens/Goal";
import Height from "../pages/Start-Screens/Height";
import Level from "../pages/Start-Screens/Level";
import Weight from "../pages/Start-Screens/Weight";
import Dieta from "../pages/Dashboard-Screens/Dieta";
import Cronometro from "../pages/Dashboard-Screens/Cronometro";
import Metas from "../pages/Dashboard-Screens/Metas";
import TreinosFirstScreen from "../pages/Treinos/Treino-FirstScreen";
import TreinosFrequency from "../pages/Treinos/Treinos-Frequency";
import TreinosObjective from "../pages/Treinos/Treinos-Objective";
import TreinosParteCorpo from "../pages/Treinos/Treino-ParteCorpo";

const Stack = createStackNavigator();

export default function Routes(){
    return(
        <Stack.Navigator>
            <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{headerShown: false}}
            />
            <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{headerShown: false}}  
            />
            <Stack.Screen
            name="Gender"
            component={Gender}
            options={{headerShown: false}}
            />
            <Stack.Screen
            name="Age"
            component={Age}
            options={{headerShown: false}}
            />
            <Stack.Screen
            name="Weight"
            component={Weight}
            options={{headerShown: false}}
            />
            <Stack.Screen
            name="Height"
            component={Height}
            options={{headerShown: false}}
            />
            <Stack.Screen 
            name="Goal"
            component={Goal}
            options={{headerShown: false}}
            />
            <Stack.Screen
            name="Level"
            component={Level}
            options={{headerShown: false}}
            />
            <Stack.Screen
            name="FillProfile"
            component={FillProfile}
            options={{headerShown: false}}
            />
            <Stack.Screen
            name="NavRoutes"
            component={NavRoutes}
            options={{headerShown: false}}  
            />
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
            <Stack.Screen
            name="TreinosFirstScreen"
            component={TreinosFirstScreen}
            options={{headerShown: false}}
            />
            <Stack.Screen
            name="TreinosFrequency"
            component={TreinosFrequency}
            options={{headerShown: false}}
            />
            <Stack.Screen
            name="TreinosObjective"
            component={TreinosObjective}
            options={{headerShown: false}}
            />
            <Stack.Screen
            name="TreinosParteCorpo"
            component={TreinosParteCorpo}
            options={{headerShown: false}}
            />
            
        </Stack.Navigator>
        
    )
}