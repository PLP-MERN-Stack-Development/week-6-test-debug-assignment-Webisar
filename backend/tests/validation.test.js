const { validateBug } = require('../middlewares/validation');
const { mockRequest, mockResponse, mockNext } = require('./testUtils');

describe('Bug Validation Middleware', () => {
    it('should pass validation with correct data', () => {
        const req = mockRequest({
            body: {
                title: 'Test Bug',
                description: 'This is a test bug',
                priority: 'medium'
            }
        });
        const res = mockResponse();
        const next = mockNext();

        validateBug(req, res, next);

        expect(next).toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalled();
    });

    it('should fail validation with missing title', () => {
        const req = mockRequest({
            body: {
                description: 'This is a test bug',
                priority: 'medium'
            }
        });
        const res = mockResponse();
        const next = mockNext();

        validateBug(req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            error: 'Title and description are required'
        });
    });
});