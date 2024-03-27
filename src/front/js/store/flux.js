const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            token: null,
            message: null,
            demo: [
                {
                    title: "FIRST",
                    background: "white",
                    initial: "white"
                },
                {
                    title: "SECOND",
                    background: "white",
                    initial: "white"
                }
            ]
        },
        actions: {
            exampleFunction: () => {
                getActions().changeColor(0, "green");
            },

            syncTokenFromSessionStore: () => {
                const token = sessionStorage.getItem("token");
                console.log("Application just loaded, syncing the session storage token")
                if(token && token !== "" && token !== undefined) setStore({ token: token });
            },

            logout: () => {
                sessionStorage.removeItem("token");
                console.log("Logging out");
                setStore({ token: null });
            },

            login: async (email, password) => {
                const opts = {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "email": email,
                        "password": password
                    })
                };

                try {
                    const resp = await fetch(process.env.BACKEND_URL + "/api/token", opts);
                    if (!resp.ok) {
                        alert('There has been some error');
                        return false;
                    }

                    const data = await resp.json();
                    console.log("Response from the backend:", data);
                    sessionStorage.setItem("token", data.access_token);
                    setStore({ token: data.access_token });
                    return true;
                } catch (error) {
                    console.error("Error logging in:", error);
                    return false;
                }
            },


            changeColor: (index, color) => {
                const store = getStore();
                const demo = store.demo.map((elm, i) => {
                    if (i === index) elm.background = color;
                    return elm;
                });
                setStore({ demo: demo });
            },

            // Define the signup action
            signup: async (email, password) => {
                const opts = {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "email": email,
                        "password": password
                    }),
                    
                };

               
                    const resp = await fetch(process.env.BACKEND_URL + "/api/signup", opts);
                    if (!resp.ok) {
                        alert('There has been some error');
                        return false;
                    }

                    const data = await resp.json();
                    console.log("Response from the backend:", data);
                    sessionStorage.setItem("token", data.access_token);
                    setStore({ token: data.access_token });
                    return true;
                
            }
        }
    };
};

export default getState;
