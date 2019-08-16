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
    }
}