// backend server address
const hostName: string | undefined = process.env.NEXT_PUBLIC_BACKEND_URL;

// backend query for user login
export async function login(email: string, password: string) {

    try {
        const response: Response = await fetch(`${hostName}/user/login`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password
            }) 
        });

        if (response.ok) {
            const data = await response.json();
            return data;

        } else {
            throw new Error('Помилка під час підключення: ' + response.statusText);
        }

    } catch (error) {
        throw new Error('Помилка під час підключення: ' + error);
    }
};

// backend query to register an user
export async function register(email: string, password: string) {

    try {

        const response = await fetch(`${hostName}/user/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        if (response.ok) {
            const data = await response.json();
            return data;

        } else {
            throw new Error('Помилка під час реєстрації:' + response.statusText);
        }

    } catch (error) {
        throw new Error('Помилка під час реєстрації:' + error);
    }
};

export async function updatePassword(token: string | null, userId: number, currentPassword: string, newUserPassword: string) {

    try {
        const response = await fetch(`${hostName}/passwordRoute/update-password`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                userId,
                currentPassword,
                newUserPassword,
            }),
        });

        if (response.ok) {
            const data = await response.json();
            return data;

        } else {
            throw new Error('Помилка під час оновлення пароля:' + response.statusText);
        }

    } catch (error) {
        throw new Error('Помилка під час оновлення пароля:' + error);
    }
};

export async function sendResetLink(email: string) {

    try {

        const response: Response =  await fetch(`${hostName}/passwordRoute/forgot-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',    
            },
            body: JSON.stringify({
                email
            }),
        });

        if (response.ok) {
            const data = await response.json();
            return data;

        } else {
            throw new Error('Помилка під час запиту на скидання пароля: ' + response.statusText);
        }

    } catch (error) {
        throw new Error('Помилка під час запиту на скидання емейлу:' + error);
    }
};

export async function resetPassword(token:string | string[], newPassword: string): Promise <void> {

    try {

        const response = await fetch(`${hostName}/passwordRoute/reset-password/${token}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                newPassword
            }),
        });

        if (response.ok) {
            const data = await response.json();
            return data;

        } else {
            throw new Error('Помилка під час скидання пароля' + response.statusText);
        }

    } catch (error) {
        throw new Error('Помилка під час скидання пароля' + error);
    }
};

export async function deleteAccount(userId: number | undefined) {

    try {

        const response = await fetch(`${hostName}/user/${userId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            return

        } else {
            throw new Error('Помилка під час видалення акаунта користувача' + response.statusText);
        }

    } catch (error) {
        throw new Error('Помилка під час видалення акаунта користувача' + error);
    }
}