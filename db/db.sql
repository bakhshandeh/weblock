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

create table blocks(
    block_id		int auto_increment primary key,
    block_owner_id		int references users,
    --block_type          text, could be useful for defferent kind of blocks , like slide show,payment,ordinary and etc.
    block_img_url	text,
    block_title		text,
    block_subtitle	text,
    block_link          text
    
);

create table menus(
    menu_id             int auto_increment primary key,
    menu_user_id	int references users,
    menu_title          text,
    menu_body           text
);
