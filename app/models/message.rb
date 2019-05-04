class Message < ApplicationRecord
  belongs_to :groups
  belongs_to :user

  validates :content, presence: true, unless: :image?

end
