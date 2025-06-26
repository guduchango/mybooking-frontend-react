
export interface GuestInterface {
    gue_id: number;
    gue_name: string;
    gue_last_name: string;
    gue_full_name: string;
    gue_identity_document: string;
    gue_email: string;
    gue_phone_number: string;
    gue_birthday: string;
    gue_age: number;
    gue_created_at: Date;
    gue_updated_at: Date;
}

export interface GuestResponse {
    data: [{
        gue_id: number;
        gue_name: string;
        gue_last_name: string;
        gue_full_name: string;
        gue_identity_document: string;
        gue_email: string;
        gue_phone_number: string;
        gue_birthday: string;
        gue_age: number;
        gue_created_at: Date;
        gue_updated_at: Date;
}]
    
}
