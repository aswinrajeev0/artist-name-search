# Music Artist Search Application

A comprehensive music artist search platform featuring intelligent auto-suggestions, fuzzy matching, and a responsive user interface. This application manages a database of 100,000+ music artists with advanced search capabilities that handle typos, misspellings, and partial queries.

## 🎯 Project Overview

This project creates a full-stack music artist search application with the following key features:
- **Large-scale dataset**: 100,000+ music artists with complete profiles
- **Intelligent search**: Advanced fuzzy matching and auto-suggestions
- **Real-time interface**: Responsive search with instant suggestions
- **Comprehensive data**: Artist name, genre, profile picture, and location
- **Error tolerance**: Handles typos, misspellings, and partial matches

## 🚀 Features

### Data Collection & Management
- Comprehensive artist database with 100,000+ entries
- Duplicate detection and data cleaning
- Artist profiles including:
  - Name
  - Genre(s)
  - Profile picture
  - Location

### Advanced Search Capabilities
- **Fuzzy matching**: Handles misspellings and typos
- **Phonetic matching**: Recognizes sound-alike words
- **Partial matching**: Suggests completions for incomplete queries
- **Abbreviation support**: Recognizes common artist abbreviations
- **Real-time suggestions**: Instant search results as you type

### Example Search Capabilities
| User Input | Suggested Result |
|------------|------------------|
| "Tailor Swift" | Taylor Swift |
| "Ed Sheeren" | Ed Sheeran |
| "Beyonse" | Beyoncé |
| "Bruno Marsk" | Bruno Mars |
| "The Week" | The Weeknd |
| "Cold Play" | Coldplay |

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │    Database     │
│   (React/Vue)   │◄──►│   (API Server)  │◄──►│   (PostgreSQL)  │
│                 │    │                 │    │                 │
│ - Search UI     │    │ - Search API    │    │ - Artist Data   │
│ - Auto-suggest  │    │ - Fuzzy Match   │    │ - Indexes       │
│ - Results Display│    │ - Data Endpoints│    │ - Search Opt.   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 📋 Stack

- **Node.js** with express
- **Database**: PostgreSQL (Supabase)
- **Nextjs** for frontend
- **Git** for version control

## 📡 API Endpoints

### Search Artists
```http
GET /api/search?q={query}&limit={limit}
```

**Parameters:**
- `q`: Search query string
- `limit`: Number of results to return (default: 10)

## 🔍 Search Algorithm

The search system implements multiple matching strategies:

1. **Exact Match**: Direct name matching
2. **Fuzzy Matching**: Using Levenshtein distance
3. **Phonetic Matching**: Soundex and Metaphone algorithms
4. **Partial Matching**: Substring and prefix matching
