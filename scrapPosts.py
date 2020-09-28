import praw
import requests
import mimetypes
import json

reddit = praw.Reddit(client_id="PsPUnJcWMwTaSA",
                     client_secret="cvlXgXTBuIYK2iISrULT682-opo", user_agent="asdfasdf")

subreddit = reddit.subreddit("sports")
subreddit = subreddit.hot(limit=120)
i = 0

for submission in subreddit:
    print(i)
    i += 1

    gif_type = mimetypes.MimeTypes().guess_type(submission.url)[0]

    # Determines that the submission is an image
    if gif_type == "image/jpeg":
        image_video = submission.url

    # Determines that the submissions is an embedded YouTube video
    elif submission.media_embed:
        media = submission.media_embed["content"]

        if media[:11] != "<blockquote":
            start_index = media.index("src") + 5
            media = media[start_index:]
            end_index = media.index('"')
            media = media[:end_index]
            image_video = "IsAVideo" + media

    else:
        image_video = "null"

    newPost = {
        "upvotes": 0,
        "numberOfComments": 0,
        "title": submission.title,
        "bodyPost": submission.selftext,
        "image_video": image_video,
        "subCheddar": "sports",
        "gif_type": gif_type
    }

    make_new_post = requests.post(
        "http://localhost:5000/automateRandomPosts", json=newPost)
