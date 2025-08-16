# P-Man Foundation Image Assets

## Folder Structure

### `/hero`
- Main homepage hero/header images
- Background images for key pages

### `/ride-photos/{year}`
- Organized by year (2016-2024)
- Event photos from each annual Pedal for P-Man ride
- Add new photos to the appropriate year folder

### `/tshirts`
- T-shirt designs and mockups from each year
- Merchandise photography

### `/logos`
- Partner and sponsor logos
- P-Man Foundation branding assets

### `/general`
- Miscellaneous photos
- Patrick's story images
- Foundation-related photography

## Adding New Photos

1. **Ride Photos**: Add to `/ride-photos/{year}/` folder
2. **General Foundation Photos**: Add to `/general/` folder
3. **New T-shirt Designs**: Add to `/tshirts/` folder
4. **Partner Logos**: Add to `/logos/` folder

## File Naming Convention

- Use descriptive names: `pedal-2024-group-start.jpg`
- Include year when relevant: `tshirt-design-2024.png`
- Use lowercase with hyphens: `hero-atlanta-cycling.jpg`
- Keep file sizes reasonable (under 2MB for web)

## Image Optimization

Next.js will automatically optimize images when using the `<Image>` component.
For best performance:
- Use WebP or AVIF when possible
- Provide appropriate alt text
- Consider multiple sizes for responsive design