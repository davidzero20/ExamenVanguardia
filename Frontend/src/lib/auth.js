//enviar token al servidor
export const sendToken = async (token) => { 
    try {
        const response = await Api.post("/login", { token });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

