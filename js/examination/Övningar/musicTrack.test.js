import { MusicTrack } from "./examination_1";

describe('MusicTrack', () => {
    test('skapar ett giltigt MusicTrack-objekt', () => {
        // Arrange + Act
        const track = new MusicTrack('Song', 'Artist', 120)

        // Assert
        expect(track.title).toBe('Song')
        expect(track.artist).toBe('Artist')
        expect(track.duration).toBe(120)
    })
    it('should throw error for empty title', () => {
        // Act
        // Arrange + Assert
        expect(() => new MusicTrack('', '', 0)).toThrow('Title cannot be empty')
    })
})