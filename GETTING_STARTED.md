# PartFinder - Car Spare Parts Marketplace

A React-based web application similar to partfinder.in for buying and selling car spare parts online.

## Features

- **Search Functionality**: Search for car spare parts by make, model, year, and part type
- **Featured Parts**: Browse featured car spare parts listings with prices and availability
- **Cars for Breaking**: View cars available for breaking down for spare parts
- **Category Browsing**: Search parts by categories like Brakes, Engine Parts, Steering, etc.
- **Regional Search**: Find parts by location across India
- **Responsive Design**: Mobile-friendly interface
- **Quick Contact**: WhatsApp and phone call integration for seller contact

## Project Structure

```
src/
├── components/
│   ├── Header.jsx          # Navigation header with logo and menu
│   ├── Header.css
│   ├── SearchBar.jsx       # Main search form component
│   ├── SearchBar.css
│   ├── PartCard.jsx        # Part listing card component
│   ├── PartCard.css
│   ├── CarCard.jsx         # Car for breaking card component
│   ├── CarCard.css
│   ├── Footer.jsx          # Footer with links and info
│   └── Footer.css
├── pages/
│   ├── Home.jsx            # Home page with all sections
│   └── Home.css
├── data/
│   └── mockData.js         # Mock data for parts, cars, and categories
├── App.jsx                 # Main app component
├── App.css
├── main.jsx                # React entry point
└── index.css               # Global styles
```

## Installation

1. **Prerequisites**: Make sure you have Node.js (v14+) and npm installed
   - Download from: https://nodejs.org/

2. **Install Dependencies**:
   ```bash
   cd Jugaad-react-app
   npm install
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173` (or the port shown in terminal)

4. **Build for Production**:
   ```bash
   npm run build
   ```

## Key Components

### Header
- Navigation bar with logo and category links
- Supplier login and signup options
- Responsive menu for mobile devices

### SearchBar
- Multi-field form to search for parts
- Filters: Car Make, Model, Year, Part name
- Auto-complete suggestions (can be added)

### PartCard
- Display individual car parts with images
- Shows price, availability, condition, delivery, warranty
- WhatsApp and Call buttons for seller contact
- Hover effects for better UX

### CarCard
- Display cars available for breaking
- Similar specs display as parts
- Contact options for inquiries

### Home Page Sections
1. **Banner** - Eye-catching header with search functionality
2. **Featured Parts** - Grid of popular parts with category tabs
3. **Cars for Breaking** - Cars available for parts extraction
4. **Search by Make** - Quick links to filter by car manufacturer
5. **Search by Region** - Filter results by location in India
6. **How It Works** - 3-step process explanation
7. **Info Section** - Benefits and guarantees

## Styling

The application uses custom CSS with:
- Modern color scheme (Red #c23030 as primary)
- Responsive grid layouts
- Mobile-first approach
- Smooth transitions and hover effects

## Mock Data

Currently, the app uses mock data from `src/data/mockData.js`. To connect to a real database:

1. Replace mock data with API calls
2. Update `Home.jsx` to fetch data from backend
3. Implement filters in the search functionality

Example API integration structure:
```javascript
// In Home.jsx
const [parts, setParts] = useState([]);

useEffect(() => {
  fetchParts().then(data => setParts(data));
}, []);
```

## Future Enhancements

- [ ] Add React Router for multiple pages (Parts List, Part Details, etc.)
- [ ] Implement user authentication (login/signup)
- [ ] Add part detail pages
- [ ] Integrate with backend API
- [ ] Add shopping cart and checkout
- [ ] User reviews and ratings
- [ ] Advanced filters (price range, condition, warranty)
- [ ] Admin dashboard for sellers
- [ ] Real-time chat with sellers
- [ ] Wishlist feature
- [ ] Order tracking

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build locally
npm run lint     # Run ESLint to check code quality
```

## Technologies Used

- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **CSS3** - Styling with responsive design
- **JavaScript ES6+** - Core language

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimization

- Images use placeholders (can be optimized with lazy loading)
- Grid layouts for efficient rendering
- CSS transitions instead of JS animations
- Mobile-responsive design reduces bandwidth

## Accessibility

- Semantic HTML structure
- Proper heading hierarchy
- Alt text for images (should be added)
- Keyboard navigation support
- ARIA labels where needed (can be added)

## Contributing

To contribute to this project:

1. Create a new branch for your feature
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

This project is available under MIT License.

## Contact & Support

For questions or support, please reach out through the contact form on the website or email: support@partfinder.in

## Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Traditional Hosting
1. Build the project: `npm run build`
2. Upload the `dist` folder to your hosting service
3. Configure server to route all requests to `index.html`

---

**Last Updated**: December 2024
