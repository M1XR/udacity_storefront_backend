import { UserStore } from '../../models/user.model';

const user = new UserStore();

describe('User Model', () => {
  describe('Methods exists', () => {
    it('should have a create method', () => {
      expect(user.create).toBeDefined();
    });

    it('should have an index method', () => {
      expect(user.index).toBeDefined();
    });

    it('should have a show method', () => {
      expect(user.show).toBeDefined();
    });

    it('should have an authenticate method', () => {
      expect(user.authenticate).toBeDefined();
    });
  });

  describe('Methods run', () => {
    it('create method should return new user', async () => {
      const result = await user.create({
        user_name: 'userTest0',
        first_name: 'firstTest0',
        last_name: 'lastTest0',
        password: 'passTest0'
      });
      expect(result.user_name).toEqual('userTest0');
      expect(result.first_name).toEqual('firstTest0');
      expect(result.last_name).toEqual('lastTest0');
      expect(result.password_digest).toBeDefined();
      expect(result.password_digest).not.toEqual('passTest0');
    });

    it('index method should return a list of users', async () => {
      await user.create({
        user_name: 'userTest0',
        first_name: 'firstTest0',
        last_name: 'lastTest0',
        password: 'passTest0'
      });
      const result = await user.index();
      expect(result[0].user_name).toEqual('userTest0');
      expect(result[0].first_name).toEqual('firstTest0');
      expect(result[0].last_name).toEqual('lastTest0');
      expect(result[0].password_digest).toBeDefined();
      expect(result[0].password_digest).not.toEqual('passTest0');
    });

    it('show method should return user with id=1', async () => {
      const result = await user.show('1');
      expect(result.user_name).toEqual('userTest0');
      expect(result.first_name).toEqual('firstTest0');
      expect(result.last_name).toEqual('lastTest0');
      expect(result.password_digest).toBeDefined();
      expect(result.password_digest).not.toEqual('passTest0');
    });

    it('authenticate method should not return the passed password', async () => {
      const result = await user.authenticate('userTest0', 'passTest0');
      expect(result).toBeDefined();
      expect(result).not.toEqual('passTest0');
    });
  });
});
