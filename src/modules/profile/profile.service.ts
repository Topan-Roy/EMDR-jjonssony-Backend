import { User } from '../auth/auth.model';
import { ApiError } from '../../utils/ApiError';

export class ProfileService {
  // GET profile
  async getProfile(userId: string) {
    const user = await User.findOne({ _id: userId, isDeleted: false }).select(
      'firstName lastName email phoneNumber avatar isVerified isProfileCompleted authProvider role createdAt'
    );

    if (!user) throw ApiError.userNotFound();

    return {
      id: user._id.toString(),
      fullName: `${user.firstName} ${user.lastName}`.trim(),
      email: user.email,
      phoneNumber: user.phoneNumber ?? null,
      avatar: user.avatar ?? null,
      isVerified: user.isVerified,
      isProfileCompleted: user.isProfileCompleted,
      authProvider: user.authProvider,
      role: user.role,
      memberSince: user.createdAt,
    };
  }

  // EDIT profile — fullName + optional phoneNumber
  async updateProfile(userId: string, fullName: string, phoneNumber?: string) {
    const parts = fullName.trim().split(/\s+/);
    const firstName = parts[0];
    const lastName = parts.slice(1).join(' ') || parts[0];

    const updateData: Record<string, unknown> = {
      firstName,
      lastName,
      isProfileCompleted: true,
    };

    if (phoneNumber !== undefined) {
      updateData.phoneNumber = phoneNumber;
    }

    const user = await User.findOneAndUpdate(
      { _id: userId, isDeleted: false },
      updateData,
      { new: true, runValidators: true }
    ).select('firstName lastName email phoneNumber avatar isVerified isProfileCompleted');

    if (!user) throw ApiError.userNotFound();

    return {
      id: user._id.toString(),
      fullName: `${user.firstName} ${user.lastName}`.trim(),
      email: user.email,
      phoneNumber: user.phoneNumber ?? null,
      avatar: user.avatar ?? null,
      isVerified: user.isVerified,
      isProfileCompleted: user.isProfileCompleted,
    };
  }

  // SOFT DELETE account
  async deleteAccount(userId: string) {
    const user = await User.findOneAndUpdate(
      { _id: userId, isDeleted: false },
      {
        isDeleted: true,
        deletedAt: new Date(),
        refreshToken: undefined,   // invalidate session immediately
      },
      { new: true }
    );

    if (!user) throw ApiError.userNotFound();

    return { message: 'Account deleted successfully' };
  }
}

export const profileService = new ProfileService();
