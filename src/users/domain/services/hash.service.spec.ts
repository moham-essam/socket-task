import {HashService} from "./hash.service";

describe('Hash Service', () => {
    const SALT = '$2b$10$j0ApCRKasvVPFNTuKkiNwO';
    const configServiceMock: any = {
        get(key: string) {
            return SALT;
        },
    }

    const hashService = new HashService(configServiceMock);

    describe('hash', () => {
        it('should hash a string using bcrypt', async () => {
            const string = 'test';
            const hashedString = '$2b$10$j0ApCRKasvVPFNTuKkiNwOPbai4xxyFCp3sDU7LhwKFOIAEftSdHG';
            await expect(hashService.hash(string)).resolves.toEqual(hashedString);
        });
    });

    describe('compare', () => {
        it('should return true if plain string matches the hashed string', async () => {
            const string = 'test';
            const hashedString = '$2b$10$j0ApCRKasvVPFNTuKkiNwOPbai4xxyFCp3sDU7LhwKFOIAEftSdHG';
            await expect(hashService.compare(string, hashedString)).resolves.toEqual(true);
        });

        it('should return false if plain string doesn\'t match the hashed string', async () => {
            const string = 'test2';
            const hashedString = '$2b$10$j0ApCRKasvVPFNTuKkiNwOPbai4xxyFCp3sDU7LhwKFOIAEftSdHG';
            await expect(hashService.compare(string, hashedString)).resolves.toEqual(false);
        });
    });
});
