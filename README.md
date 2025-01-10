# Social Media Analytics Platform - EngageMetrics
## Complete Technical Documentation

### Table of Contents
1. [Deployment Overview](#deployment-overview)
2. [Project Goals](#project-goals)
3. [System Architecture Overview](#system-architecture-overview)
4. [Frontend Development](#frontend-development)
5. [Backend Development](#backend-development)
6. [LangFlow Integration Details](#langflow-integration-details)
7. [Technical Overview](#technical-overview)
8. [API Reference](#api-reference)
9. [Data Model](#data-model)

---

**Deployment Overview**

- **Live Application**
  - **URL**: [engage-metrics.vercel.app](https://engage-metrics.vercel.app)
  - **Platform**: Vercel
  - **Status**: Active

- **Infrastructure**
  - **Frontend**: Vercel Web Services
  - **Database**: DataStax Astra DB
  - **AI Integration**: LangFlow and OpenAI

**System Architecture Overview**

- **Frontend Structure**
  - **Landing Page**
    - Navigation menu
    - Features introduction
    - Team section
    - Call-to-action buttons

  - **Analytics Dashboard**
    - Overview of performance metrics
    - Graphical data visualizations
    - Post engagement analysis
    - Detailed post data tables

- **Backend Structure**
  - **Proxy Server**
    - Manages client requests and responses
    - Streams data in real-time
    - Provides error handling mechanisms

  - **Data Processing**
    - Text data chunking and processing
    - Interaction with the database
    - GPT-powered data insights generation

**Frontend Development**

- **Dashboard Components**

  - **Performance Metrics Cards**
    ```typescript
    interface EngagementMetrics {
      totalEngagement: number;
      engagementRate: number;
      performanceScore: number;
    }
    ```

  - **Data Visualization**
    - Performance trends
    - Post type comparisons
    - Engagement summaries

  - **Data Table**
    - Sort and filter options
    - Pagination with 50 items per page
    - Search bar for quick access

- **State Management**
  ```typescript
  interface DashboardState {
    posts: PostData[];
    dateRange: [Date, Date];
    selectedPostTypes: string[];
    sortBy: string;
    sortOrder: 'asc' | 'desc';
    currentPage: number;
    filters: {
      search: string;
      minEngagement?: number;
      maxEngagement?: number;
    };
  }
  ```

**Backend Development**

- **Server Setup**
  ```javascript
  const express = require('express');
  const http = require('http');
  const WebSocket = require('ws');
  const cors = require('cors');

  const app = express();
  const server = http.createServer(app);
  const wss = new WebSocket.Server({ server });
  ```

- **WebSocket Handling**
  - Assign request IDs
  - Real-time connection management
  - Streaming data to clients
  - Handle errors in communication

- **API Endpoints**
  - **Chat Endpoint**
    - Receives client requests
    - Forwards to LangFlow for processing
    - Streams GPT responses

**LangFlow Integration Details**

- **Workflow Overview**

  - **Data Input**
    - Load CSV data for analysis: `mock_social_media_data.csv`

  - **Text Processing**
    - Chunking text into pieces of size 1000 with a 200-character overlap
    - Custom delimiters for data splitting

  - **Database Integration**
    - Database: `davedb`
    - Collection: `engagement`
    - Embedding: OpenAI's `text-embedding-3-small`

  - **AI Integration**
    - Model: `gpt-4o-mini`
    - Temperature: 0.1
    - Streaming enabled for real-time responses

**Technical Overview**

- **Design and Aesthetics**

  - **Colors**
    - Primary: #2563EB
    - Secondary: #3B82F6
    - Accent: #EAB308
    - Background: #F8FAFC
    - Text: #1E293B

  - **Typography**
    - Header: Inter
    - Body Text: Roboto
    - Code: Source Code Pro

  - **Responsive Layouts**
    - Mobile: 320px - 480px
    - Tablet: 481px - 768px
    - Desktop: 769px and above

- **Optimization**

  - **Frontend**
    - Virtual scrolling for large datasets
    - Response caching for performance
    - Lazy loading of resources
    - Image and asset optimization

  - **Backend**
    - Connection pooling for efficiency
    - Request batching for reduced overhead
    - Data streaming to minimize load time
    - Error handling for robust operations

- **Testing Strategy**

  - **Unit Testing**
    - Component and function-level tests
    - State management unit tests

  - **Integration Testing**
    - API endpoint integration
    - WebSocket connection testing

  - **End-to-End Testing**
    - User experience testing
    - Performance benchmarks
    - Error handling tests

**API Reference**

- **Endpoints**

  - **Chat API**
    ```javascript
    POST /chat
    {
      "input_value": string,
      "requestId": string
    }
    ```

  - **Analytics API**
    ```javascript
    GET /api/posts
    Query Parameters:
    - startDate: ISO date string
    - endDate: ISO date string
    - postTypes: string[]
    - page: number
    - limit: number
    - sort: string
    - order: 'asc' | 'desc'
    ```

**Data Model**

- **Post Data Model**
  ```typescript
  interface PostData {
    Post_ID: string;
    Post_Type: 'Reel' | 'Carousel' | 'Static Image';
    Likes: number;
    Shares: number;
    Comments: number;
    Date_Posted: string;
  }
  ```

- **Analytics Data Model**
  ```typescript
  interface AnalyticsData {
    totalEngagement: number;
    engagementRate: number;
    performanceScore: number;
    postTypeDistribution: {
      [key: string]: number;
    };
    timeSeries 
    
This documentation outlines the architecture and implementation of the Social Media Analytics Platform. For more detailed instructions or queries, feel free to contact the development team.
