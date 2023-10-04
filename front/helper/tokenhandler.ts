import ls from "localstorage-slim" 
export function setToken(token:string)
{
    const value={
        token:token,
    }
    ls.set('codemon',token,{ttl:86400})
}
export function getToken()
{
    return(ls.get('codemon'))
}
export function removeToken()
{
    ls.remove('codemon');
}