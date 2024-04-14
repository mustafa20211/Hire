const authorizationMiddlware = (job,) => {
    return (req, res, next) => {
        const current_user_role = req.user.roles;
        console.log('authorization Fun')
        let requied_role;
        switch (job) {
            case 'create_officer':
                requied_role = ['admin', 'manager']
                break;
            case 'create_new_contract':
                requied_role = ['admin', 'manager']
                break;
            case 'update':
                break;
            case 'create_new_offer':
                requied_role = ['contractor']
                break;
            case 'get_offers_by_contractId':
                requied_role = ['admin', "manager", "acountant", "engineer"]
                break;
            case "get_offers_by_contractorId":
                requied_role = (req.params.contractorId ===
                    req.user.id) ?
                    ['contractor'] : ['admin', 'manager'];
            case 'insert_tech_audit':
                requied_role = ['engineer'];
                break;
            case 'insert_finanacial_audit':
                requied_role = ['acountant'];
                break;
            default:
                break;
        }
        const roleCheck = requied_role.some(ele => current_user_role.includes(ele))
        roleCheck ? next() : res.send({ authorizatio: false, message: "you are not authorized" })



    }
}




export default authorizationMiddlware; 