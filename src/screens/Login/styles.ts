import { makeStyles } from '../../utils';

export default makeStyles.create({
  imageDoctor: {
    position: 'absolute',
    bottom: 40,
    left: 10,
    width: '40%',
  },
  boxContent: {
    flexDirection: 'row',
    height: 'calc(100% - 100px)',
    alignSelf: 'flex-end',
  },
  containerBox: { marginTop: 20 },
});
