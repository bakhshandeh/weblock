create table users(
    user_id		int auto_increment primary key,
    user_username	text,
    user_password	text
);

create table users_data(
    user_id		int references users,
    key			text,
    value		text
);

create table user_boxes(
    box_id		int auto_increment primary key,
    box_user_id		int references users,
    box_img_url		text,
    box_text		text,
    box_title		text
    
);

create table menus(
    menu_id             int auto_increment primary key,
    menu_user_id	int references users,
    menu_title          text,
    menu_body           text
);
