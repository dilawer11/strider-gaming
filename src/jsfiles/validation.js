import { platform } from "os";

// fill this file with validation
export default{
    validatePartners: (numTeam,partners,participants, terms)=> {
        let objection = null;
        let passedPartners = [];
        if(!terms){
            objection = 'Please agree to terms before registering'
        } else if(partners.length!=numTeam){
            objection = 'Please Select ' + numTeam + ' Partners'
        } else{
            partners.forEach(partner => {
                if(participants.includes(partner)){
                    objection = partner + ' is already registered in another team'
                } else if(passedPartners.includes(partner)) {
                    objection = 'Please select different partners in each fields';
                }
                passedPartners.push(partner)
            })
        }
        return objection;
    },
    validateUserInformation(userProfile,terms,password,confirmPassword){
        let objection = null;
        if(!userProfile){
            objection = 'Something went wrong please contact on the numbers provided'
        }
        var emailRegex = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/
        if(userProfile.name.length<4){
            objection = 'Name Must Be Atleast 4 Characters Long'
        } else if(!emailRegex.test(userProfile.email)){
            objection = 'Incorrect Email Type Entered'
        } 
        //Length Checks
        if(userProfile.platformID!=null && userProfile.platformID.length>50){
            objection = 'Platform ID Too Large Max Characters: 50'
        } else if(userProfile.name.length>50){
            objection = 'Name Too Large Max Characters: 50'
        } else if(userProfile.discordID.length>50){
            objection = 'Discord ID Too Large Max Characters: 50'
        } else if(userProfile.discordID.length < 1){
            objection = 'Enter a Discord ID'
        } else if(userProfile.epicID.length>50){
            objection = 'Epic ID Too Large Max Characters: 50'
        } else if(userProfile.contactNumber.length!=12){
            objection = 'Contact Number Should Be 12 Characters e.g (03##-#######)'
        } else if (!terms){
            objection = 'Please Check The Agree To Terms Box'
        } else if (password.length<6){
            objection = 'Password Must Be Atleast 6 Characters'
        } else if (password != confirmPassword){
            objection = "Passwords Don't Match" 
        }
        return objection
    }

}