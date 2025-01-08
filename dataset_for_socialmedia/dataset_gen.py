import random
import pandas as pd
from datetime import datetime, timedelta

# Define post types and their engagement weights
post_types = ['Reel', 'Carousel', 'Static_images', 'Poll']
engagement_weights = {
    'Reel': {'likes': (400, 900), 'shares': (150, 400), 'comments': (80, 300)},
    'Carousel': {'likes': (250, 600), 'shares': (60, 200), 'comments': (40, 120)},
    'Static_images': {'likes': (30, 150), 'shares': (5, 30), 'comments': (2, 15)},
    'Poll': {'likes': (50, 300), 'shares': (10, 50), 'comments': (5, 25)}
}

# Define date range
start_date = datetime(2025, 1, 1)
end_date = datetime(2025, 1, 31)

# Generate dataset
data = []
for post_id in range(1, 201):  # Post IDs from 1 to 150
    post_type = random.choice(post_types)  # Randomly select post type
    likes = random.randint(*engagement_weights[post_type]['likes'])
    shares = random.randint(*engagement_weights[post_type]['shares'])
    comments = random.randint(*engagement_weights[post_type]['comments'])
    date_posted = start_date + timedelta(days=random.randint(0, (end_date - start_date).days))
    
    # Append data
    data.append([post_id, post_type, likes, shares, comments, date_posted])

# Define column names
columns = ['Post_ID', 'Post_Type', 'Likes', 'Shares', 'Comments', 'Date_Posted']

# Create DataFrame
df = pd.DataFrame(data, columns=columns)

# Save to CSV and JSON
df.to_csv('mock_social_media_data.csv', index=False)
df.to_json('mock_social_media_data.json', orient='records', date_format='iso')

print("Mock dataset created with 200 samples.")
