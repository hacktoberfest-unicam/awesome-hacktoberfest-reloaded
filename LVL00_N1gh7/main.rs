use std::env;
use futures::StreamExt;
use telegram_bot::*;


pub struct ChatMember {
    pub user: Box<User>,
    pub status: ChatMemberStatus,
//  pub until_date: Option<Time>,
    pub can_be_edited: Option<bool>,
    pub can_change_info: Option<bool>,
    pub can_post_messages: Option<bool>,
    pub can_edit_messages: Option<bool>,
    pub can_delete_messages: Option<bool>,
    pub can_invite_users: Option<bool>,
    pub can_restrict_members: Option<bool>,
    pub can_pin_messages: Option<bool>,
    pub can_promote_members: Option<bool>,
    pub can_send_messages: Option<bool>,
    pub can_send_media_messages: Option<bool>,
    pub can_send_other_messages: Option<bool>,
    pub can_add_web_page_previews: Option<bool>,
}

#[tokio::main]
async fn main() -> Result<(), Error> {

    let token = env::var("TELEGRAM_BOT_TOKEN").expect("TELEGRAM_BOT_TOKEN not set");
    let api = Api::new(token);


    let mut stream = api.stream();
    while let Some(update) = stream.next().await {

        let update = update?;
        if let UpdateKind::Message(message) = update.kind {
            if let MessageKind::Text { ref data, .. } = message.kind {
                println!("{}", &message.from.id);
                println!("<{}>: {}", &message.from.first_name, data);
                //match data.as_str() {
                //    if
                //}
                if data == "-h" || data == "--help" {
                    api.send(message.text_reply(format!(
                        "Lista Comandi\n ban\n kick",
                    )))
                    .await?;
                }
                if data == "/ban" {
                    api.send(message.text_reply(format!(
                        "Sei stato bannato {}",&message.from.first_name,
                    )))
                    .await?;
                }
                if data == "/kick" {
                    api.send(message.text_reply(format!(
                        "Sei stato kickato {}",&message.from.first_name,
                    )))
                    .await?;
                }
            }
        }
    }
    Ok(())
}
