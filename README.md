# README

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|mail|string|null: false|
|password|string|null: false|
### Association
- has_many :comments
- has_many :chats, through:  :teams

## chatsテーブル
|Column|Type|Options|
|------|----|-------|
|group|string|null: false|
|text|text|null: false|
### Association
- has_many :comments
- has_many :users, through: :teams

## teamsテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|chat_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :chat

## commentsテーブル
|Column|Type|Options|
|------|----|-------|
|text|text|null: false|
|user_id|integer|null: false, foreign_key: false|
|chat_id|integer|null: false, foreign_key: false|
### Association
- belongs_to :user
- belongs_to :chat


This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
