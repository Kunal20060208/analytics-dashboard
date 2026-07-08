import {
Routes,
Route,
Navigate
} from "react-router-dom";

import {
useContext
} from "react";

import {
AuthContext
} from "./context/AuthContext";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Inbox from "./pages/Inbox";
import Support from "./pages/Support";
import Users from "./pages/Users";
import Analytics from "./pages/Analytics";
import AdminPanel from "./pages/AdminPanel";
import NotFound from "./pages/NotFound";

import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";



function App(){


const {

user

}=useContext(AuthContext);




return(


<Routes>


<Route

path="/login"

element={

user

?

<Navigate to="/"/>

:

<Login/>

}

/>



<Route

path="/register"

element={

user

?

<Navigate to="/"/>

:

<Register/>

}

/>






<Route

path="/"

element={

<ProtectedRoute>

<Dashboard/>

</ProtectedRoute>

}

/>






<Route

path="/profile"

element={

<ProtectedRoute>

<Profile/>

</ProtectedRoute>

}

/>






<Route

path="/settings"

element={

<ProtectedRoute>

<Settings/>

</ProtectedRoute>

}

/>






<Route

path="/inbox"

element={

<ProtectedRoute>

<Inbox/>

</ProtectedRoute>

}

/>






<Route

path="/support"

element={

<ProtectedRoute>

<Support/>

</ProtectedRoute>

}

/>






<Route

path="/users"

element={

<AdminRoute>

<Users/>

</AdminRoute>

}

/>






<Route

path="/analytics"

element={

<AdminRoute>

<Analytics/>

</AdminRoute>

}

/>






<Route

path="/admin"

element={

<AdminRoute>

<AdminPanel/>

</AdminRoute>

}

/>






<Route

path="*"

element={<NotFound/>}

/>


</Routes>


);


}



export default App;