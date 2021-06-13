import { makeStyles } from '../../utils';

export default makeStyles.create({
  imageDoctor: {
    position: 'absolute',
    bottom: 40,
    left: 10,
    width: '35%',
  },
  boxContent: {
    flexDirection: 'row',
    height: 'calc(100% - 100px)',
  },
  containerBox: { marginTop: 20 },
  buttonLogin: { marginTop: 30, height: 40, fontSize: 20 },
  text: { textAlign: 'center', marginBottom: 30 },
  imageLogo: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});
