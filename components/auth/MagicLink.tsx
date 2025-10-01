import { InputWithLabel, Loading } from '@/components/shared';
import { Button, buttonClassName } from '@/components/ui/button';
import { maxLengthPolicies } from '@/lib/common';
import env from '@/lib/env';
import { useFormik } from 'formik';
import useInvitation from 'hooks/useInvitation';
import { signIn, useSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

interface MagicLinkProps {
  csrfToken: string | undefined;
}

const MagicLink = ({ csrfToken }: MagicLinkProps) => {
  const router = useRouter();
  const { status } = useSession();
  const { t } = useTranslation('common');
  const { invitation } = useInvitation();

  const params = invitation ? `?token=${invitation.token}` : '';

  const callbackUrl = invitation
    ? `/invitations/${invitation.token}`
    : env.redirectIfAuthenticated;

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().required().email().max(maxLengthPolicies.email),
    }),
    onSubmit: async (values) => {
      const response = await signIn('email', {
        email: values.email,
        csrfToken,
        redirect: false,
        callbackUrl,
      });

      formik.resetForm();

      if (response?.error) {
        toast.error(t('email-login-error'));
        return;
      }

      if (response?.status === 200 && response?.ok) {
        toast.success(t('email-login-success'));
        return;
      }
    },
  });

  if (status === 'loading') {
    return <Loading />;
  }

  if (status === 'authenticated') {
    router.push(env.redirectIfAuthenticated);
  }

  return (
    <>
      <Head>
        <title>{t('magic-link-title')}</title>
      </Head>
      <div className="glass-panel border border-white/30 p-6 shadow-glass dark:border-white/10">
        <form onSubmit={formik.handleSubmit}>
          <div className="space-y-2">
            <InputWithLabel
              type="email"
              label="Email"
              name="email"
              placeholder="jackson@boxyhq.com"
              value={formik.values.email}
              descriptionText="We’ll email you a magic link for a password-free sign in."
              error={formik.touched.email ? formik.errors.email : undefined}
              onChange={formik.handleChange}
            />
            <Button
              type="submit"
              variant="primary"
              size="md"
              className="w-full justify-center"
              disabled={formik.isSubmitting || !formik.dirty}
            >
              {formik.isSubmitting
                ? `${t('send-magic-link')}...`
                : t('send-magic-link')}
            </Button>
          </div>
        </form>
        <div className="my-5 h-px bg-border/70" />
        <div className="space-y-3">
          <Link
            href={`/auth/login/${params}`}
            className={buttonClassName({
              variant: 'secondary',
              size: 'md',
              className: 'w-full justify-center',
            })}
          >
            &nbsp;{t('sign-in-with-password')}
          </Link>
          <Link
            href="/auth/sso"
            className={buttonClassName({
              variant: 'secondary',
              size: 'md',
              className: 'w-full justify-center',
            })}
          >
            &nbsp;{t('continue-with-saml-sso')}
          </Link>
        </div>
      </div>
      <p className="text-center text-sm text-gray-600 mt-3">
        {t('dont-have-an-account')}
        <Link
          href={`/auth/join${params}`}
          className="font-medium text-indigo-600 hover:text-indigo-500"
        >
          &nbsp;{t('create-a-free-account')}
        </Link>
      </p>
    </>
  );
};

export default MagicLink;
