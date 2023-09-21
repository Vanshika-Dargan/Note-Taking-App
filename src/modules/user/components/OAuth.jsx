import Button from '@mui/material/Button';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { oAuthWithGoogle } from '../repository/oauth';
import { useNavigate } from 'react-router-dom';
export const OAuth = ()=>{
    const navigate = useNavigate();
    const googleOAuth = async ()=>{
        try{
        const user = await oAuthWithGoogle();
        if(user){
            navigate('/dashboard ',{state:{'username':user.displayName}});
            console.log('User info is ', user);
        }
        else{
            console.log('Some Problem in User Fetch')
        }
    }
    catch(err){
        console.log('Some Problem in User Fetch ', err);
    }
    }
    return (<Button onClick={googleOAuth} variant="contained"><VpnKeyIcon/>&nbsp;Login with Google</Button>)
}